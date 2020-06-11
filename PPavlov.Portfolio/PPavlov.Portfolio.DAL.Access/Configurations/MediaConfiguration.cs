using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    public class MediaConfiguration : IEntityTypeConfiguration<Media>
    {
        public void Configure(EntityTypeBuilder<Media> builder)
        {
            builder.HasIndex(i => i.Name).IsUnique();

            builder.Property(b => b.CreatedAt).HasDefaultValueSql("getdate()");
            builder.Property(b => b.UpdatedAt).HasDefaultValueSql("getdate()");
        }
    }
}
