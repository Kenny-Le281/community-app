using CommunityApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CommunityApp.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>(e =>
        {
            e.ToTable("events");
            e.HasKey(x => x.Id);

            e.Property(x => x.Id).HasColumnName("id").HasDefaultValueSql("gen_random_uuid()");
            e.Property(x => x.Title).HasColumnName("title").IsRequired();
            e.Property(x => x.Description).HasColumnName("description");
            e.Property(x => x.StartsAt).HasColumnName("starts_at");
            e.Property(x => x.EndsAt).HasColumnName("ends_at");
            e.Property(x => x.Timezone).HasColumnName("timezone");
            e.Property(x => x.LocationName).HasColumnName("location_name");
            e.Property(x => x.Address).HasColumnName("address");
            e.Property(x => x.Latitude).HasColumnName("latitude");
            e.Property(x => x.Longitude).HasColumnName("longitude");
            e.Property(x => x.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
        });
    }
}
