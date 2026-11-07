namespace CommunityApp.Api.Dtos;

// The shape of an event as the API returns it to clients.
// Kept separate from the Event entity so database columns can change
// (or internal fields can be added) without changing the public API.
public record EventResponse(
    Guid Id,
    string Title,
    string? Description,
    DateTime? StartsAt,
    DateTime? EndsAt,
    string? Timezone,
    string? LocationName,
    string? Address,
    double? Latitude,
    double? Longitude,
    DateTime CreatedAt);
