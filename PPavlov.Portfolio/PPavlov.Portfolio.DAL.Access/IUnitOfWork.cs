using PPavlov.Portfolio.DAL.Contracts;
using PPavlov.Portfolio.DAL.Entities;
using System;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.DAL.Access
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User, string> UsersRepository { get; }
        IRepository<Project, int> ProjectsRepository { get; }
        IRepository<ProjectDetail, int> ProjectDetailsRepository { get; }
        IRepository<Image, int> ImagesRepository { get; }
        IRepository<Link, int> LinksRepository { get; }
        IRepository<Tag, int> TagsRepository { get; }

        IRepository<ProjectDetailImage, int> ProjectDetailImageRepository { get; }
        IRepository<ProjectDetailTag, int> ProjectDetailTagRepository { get; }
        IRepository<ProjectDetailLink, int> ProjectDetailLinkRepository { get; }

        Task CompleteAsync();
    }
}