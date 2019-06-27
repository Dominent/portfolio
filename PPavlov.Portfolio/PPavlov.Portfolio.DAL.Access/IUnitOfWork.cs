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
        IRepository<ProjectImage, int> ProjectImagesRepository { get; }
        IRepository<ProjectLink, int> ProjectLinksRepository { get; }
        IRepository<ProjectTag, int> ProjectTagsRepository { get; }

        Task CompleteAsync();
    }
}