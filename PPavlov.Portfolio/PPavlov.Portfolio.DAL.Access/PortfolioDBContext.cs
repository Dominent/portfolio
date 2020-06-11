using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Access.Configurations;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access
{
    public class PortfolioDbContext : IdentityDbContext<User>
    {
        public PortfolioDbContext(DbContextOptions options)
              : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectDetail> ProjectDetails { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<Library> Libraries { get; set; }

        public DbSet<ProjectDetailImage> ProjectDetailImages { get; set; }
        public DbSet<ProjectDetailTag> ProjectDetailTags { get; set; }
        public DbSet<ProjectDetailLink> ProjectDetailLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ProjectDetailImageConfiguration());
            builder.ApplyConfiguration(new ProjectDetailLinkConfiguration());
            builder.ApplyConfiguration(new ProjectDetailTagConfiguration());

            builder.ApplyConfiguration(new MediaConfiguration());
            builder.ApplyConfiguration(new LibraryConfiguration());

            builder.Entity<ProjectDetail>()
                .HasIndex(x => x.ProjectId)
                .IsUnique();

            builder.Entity<Library>()
                .HasOne(x => x.Parent)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Library>()
                .HasMany(c => c.Media)
                .WithOne(e => e.Library)
                .IsRequired();

            base.OnModelCreating(builder);
        }
    }
}
