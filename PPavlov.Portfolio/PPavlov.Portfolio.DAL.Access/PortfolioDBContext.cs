using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Access.Configurations;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access
{
    public class PortfolioDBContext : IdentityDbContext<User>
    {
        public PortfolioDBContext(DbContextOptions<PortfolioDBContext> options)
              : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectDetail> ProjectDetails { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public DbSet<ProjectDetailImage> ProjectDetailImages { get; set; }
        public DbSet<ProjectDetailTag> ProjectDetailTags { get; set; }
        public DbSet<ProjectDetailLink> ProjectDetailLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ProjectDetailImageConfiguration());
            builder.ApplyConfiguration(new ProjectDetailLinkConfiguration());
            builder.ApplyConfiguration(new ProjectDetailTagConfiguration());

            builder.Entity<ProjectDetail>()
                .HasIndex(x => x.ProjectId)
                .IsUnique();

            base.OnModelCreating(builder);
        }
    }
}
