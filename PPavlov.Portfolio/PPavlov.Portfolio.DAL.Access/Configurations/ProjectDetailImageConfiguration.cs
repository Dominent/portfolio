using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    internal class ProjectDetailImageConfiguration : IEntityTypeConfiguration<ProjectDetailImage>
    {
        public void Configure(EntityTypeBuilder<ProjectDetailImage> builder)
        {
            builder
               .HasKey(d => new { d.ProjectDetailId, ProjectImageId = d.ImageId });

            builder
                .HasOne(x => x.ProjectDetail)
                .WithMany(x => x.ProjectDetailImages)
                .HasForeignKey(x => x.ProjectDetailId);

            builder
               .HasOne(x => x.Image)
               .WithMany()
               .HasForeignKey(x => x.ImageId);

            builder.Property(b => b.CreatedAt).HasDefaultValueSql("getdate()");
            builder.Property(b => b.UpdatedAt).HasDefaultValueSql("getdate()");
        }
    }
}