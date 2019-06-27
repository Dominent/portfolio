﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PPavlov.Portfolio.DAL.Access;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    [DbContext(typeof(PortfolioDBContext))]
    [Migration("20190626173521_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Header");

                    b.Property<int>("ProjectDetailId");

                    b.Property<int>("ProjectImageId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectDetailId");

                    b.HasIndex("ProjectImageId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Info");

                    b.HasKey("Id");

                    b.ToTable("ProjectDetails");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailImage", b =>
                {
                    b.Property<int>("ProjectDetailId");

                    b.Property<int>("ProjectImageId");

                    b.HasKey("ProjectDetailId", "ProjectImageId");

                    b.HasIndex("ProjectImageId");

                    b.ToTable("ProjectDetailImages");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailLink", b =>
                {
                    b.Property<int>("ProjectDetailId");

                    b.Property<int>("ProjectLinkId");

                    b.HasKey("ProjectDetailId", "ProjectLinkId");

                    b.HasIndex("ProjectLinkId");

                    b.ToTable("ProjectDetailLinks");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailTag", b =>
                {
                    b.Property<int>("ProjectDetailId");

                    b.Property<int>("ProjectTagId");

                    b.HasKey("ProjectDetailId", "ProjectTagId");

                    b.HasIndex("ProjectTagId");

                    b.ToTable("ProjectDetailTags");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImageAlt");

                    b.Property<string>("ImagePath");

                    b.HasKey("Id");

                    b.ToTable("ProjectImages");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Href");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProjectLinks");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ProjectTags");
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PPavlov.Portfolio.DAL.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.Project", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectDetail", "ProjectDetail")
                        .WithMany()
                        .HasForeignKey("ProjectDetailId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectImage", "ProjectImage")
                        .WithMany()
                        .HasForeignKey("ProjectImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailImage", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectDetail", "ProjectDetail")
                        .WithMany("ProjectDetailImages")
                        .HasForeignKey("ProjectDetailId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectImage", "ProjectImage")
                        .WithMany()
                        .HasForeignKey("ProjectImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailLink", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectDetail", "ProjectDetail")
                        .WithMany("ProjectDetailLinks")
                        .HasForeignKey("ProjectDetailId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectLink", "ProjectLink")
                        .WithMany()
                        .HasForeignKey("ProjectLinkId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PPavlov.Portfolio.DAL.Entities.ProjectDetailTag", b =>
                {
                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectDetail", "ProjectDetail")
                        .WithMany("ProjectDetailTags")
                        .HasForeignKey("ProjectDetailId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PPavlov.Portfolio.DAL.Entities.ProjectTag", "ProjectTag")
                        .WithMany()
                        .HasForeignKey("ProjectTagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
