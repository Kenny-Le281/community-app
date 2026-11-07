namespace CommunityApp.Api.Dtos;

// Only the fields a user is allowed to set when creating an event.
// Id and CreatedAt are filled in by the database, so they are not here.
public record CreateEventRequest(
    string? Title,
    string? Description,
    DateTimeOffset? StartsAt,
    DateTimeOffset? EndsAt,
    string? Timezone,
    string? LocationName,
    string? Address,
    double? Latitude,
    double? Longitude);
