﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    internal class ProjectDetailImageConfiguration : IEntityTypeConfiguration<ProjectDetailImage>
    {
        public void Configure(EntityTypeBuilder<ProjectDetailImage> builder)
        {
            builder
               .HasKey(d => new { d.ProjectDetailId, d.ProjectImageId });

            builder
                .HasOne(x => x.ProjectDetail)
                .WithMany(x => x.ProjectDetailImages)
                .HasForeignKey(x => x.ProjectDetailId);

            builder
               .HasOne(x => x.ProjectImage)
               .WithMany()
               .HasForeignKey(x => x.ProjectImageId);
        }
    }
}