using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Configurations
{
    public class LibraryConfiguration : IEntityTypeConfiguration<Library>
    {
        public void Configure(EntityTypeBuilder<Library> builder)
        {
            builder.Property(b => b.CreatedAt).HasDefaultValueSql("getdate()");
            builder.Property(b => b.UpdatedAt).HasDefaultValueSql("getdate()");
        }
    }
}
