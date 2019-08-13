using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Contracts;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access
{
    public class PortfolioUnitOfWork : IUnitOfWork
    {
        private readonly PortfolioDBContext _dbContext;

        public PortfolioUnitOfWork(PortfolioDBContext dbContext)
        {
            _dbContext = dbContext;

            this.UsersRepository = new EFRepository<User, string>(_dbContext);
            this.ProjectsRepository = new EFRepository<Project, int>(_dbContext);
            this.ProjectDetailsRepository = new EFRepository<ProjectDetail, int>(_dbContext);
            this.ProjectImagesRepository = new EFRepository<ProjectImage, int>(_dbContext);
            this.ProjectLinksRepository = new EFRepository<ProjectLink, int>(_dbContext);
            this.ProjectTagsRepository = new EFRepository<ProjectTag, int>(_dbContext);
        }

        public IRepository<User, string> UsersRepository { get; }
        public IRepository<Project, int> ProjectsRepository { get; }
        public IRepository<ProjectDetail, int> ProjectDetailsRepository { get; }
        public IRepository<ProjectImage, int> ProjectImagesRepository { get; }
        public IRepository<ProjectLink, int> ProjectLinksRepository { get; }
        public IRepository<ProjectTag, int> ProjectTagsRepository { get; }

        public async Task CompleteAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
