using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    internal class ProjectDetailLinkConfiguration : IEntityTypeConfiguration<ProjectDetailLink>
    {
        public void Configure(EntityTypeBuilder<ProjectDetailLink> builder)
        {
            builder
                .HasKey(d => new { d.ProjectDetailId, ProjectLinkId = d.LinkId });

            builder
                .HasOne(x => x.ProjectDetail)
                .WithMany(x => x.ProjectDetailLinks)
                .HasForeignKey(x => x.ProjectDetailId);

            builder
               .HasOne(x => x.Link)
               .WithMany()
               .HasForeignKey(x => x.LinkId);

            builder.Property(b => b.CreatedAt).HasDefaultValueSql("getdate()");
            builder.Property(b => b.UpdatedAt).HasDefaultValueSql("getdate()");
        }
    }
}