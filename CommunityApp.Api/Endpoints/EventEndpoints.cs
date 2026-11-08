using CommunityApp.Api.Data;
using CommunityApp.Api.Dtos;
using CommunityApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunityApp.Api.Endpoints;

public static class EventEndpoints
{
    public static void MapEventEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/events");

        group.MapGet("/", GetEvents);
        group.MapPost("/", CreateEvent);
    }

    private static async Task<IResult> GetEvents(AppDbContext db, string? category)
    {
        var query = db.Events.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(category))
        {
            var normalized = category.Trim().ToLowerInvariant();
            query = query.Where(e => e.Category == normalized);
        }

        var events = await query
            .OrderBy(e => e.StartsAt)
            .ToListAsync();

        return Results.Ok(events.Select(ToResponse));
    }

    private static async Task<IResult> CreateEvent(CreateEventRequest request, AppDbContext db)
    {
        // 1. Validate the input
        var errors = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(request.Title))
            errors["title"] = ["Title is required."];

        if (request.StartsAt is not null && request.EndsAt is not null && request.EndsAt < request.StartsAt)
            errors["endsAt"] = ["End time must be after the start time."];

        if (request.Latitude is < -90 or > 90)
            errors["latitude"] = ["Latitude must be between -90 and 90."];

        if (request.Longitude is < -180 or > 180)
            errors["longitude"] = ["Longitude must be between -180 and 180."];

        if (errors.Count > 0)
            return Results.ValidationProblem(errors);

        // 2. Map the request onto the database entity
        var newEvent = new Event
        {
            Title = request.Title!.Trim(),
            Category = string.IsNullOrWhiteSpace(request.Category)
                ? null
                : request.Category.Trim().ToLowerInvariant(),
            Description = request.Description,
            StartsAt = request.StartsAt?.UtcDateTime,
            EndsAt = request.EndsAt?.UtcDateTime,
            Timezone = request.Timezone,
            LocationName = request.LocationName,
            Address = request.Address,
            Latitude = request.Latitude,
            Longitude = request.Longitude
        };

        // 3. Save it (EF Core generates the INSERT)
        db.Events.Add(newEvent);
        await db.SaveChangesAsync();

        // 4. Return 201 Created with the saved event, including its new id
        return Results.Created($"/api/events/{newEvent.Id}", ToResponse(newEvent));
    }

    // Maps a database entity to the shape we return to clients.
    private static EventResponse ToResponse(Event e) => new(
        e.Id, e.Title, e.Category, e.Description, e.StartsAt, e.EndsAt, e.Timezone,
        e.LocationName, e.Address, e.Latitude, e.Longitude, e.CreatedAt);
}
