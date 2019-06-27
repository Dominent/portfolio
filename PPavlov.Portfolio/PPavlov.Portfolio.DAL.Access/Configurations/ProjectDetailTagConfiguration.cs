﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    internal class ProjectDetailTagConfiguration : IEntityTypeConfiguration<ProjectDetailTag>
    {
        public void Configure(EntityTypeBuilder<ProjectDetailTag> builder)
        {
            builder
                .HasKey(d => new { d.ProjectDetailId, d.ProjectTagId });

            builder
                .HasOne(x => x.ProjectDetail)
                .WithMany(x => x.ProjectDetailTags)
                .HasForeignKey(x => x.ProjectDetailId);

            builder
               .HasOne(x => x.ProjectTag)
               .WithMany()
               .HasForeignKey(x => x.ProjectTagId);
        }
    }
}