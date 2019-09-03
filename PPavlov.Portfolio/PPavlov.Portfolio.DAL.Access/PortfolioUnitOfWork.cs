using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Contracts;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access
{
    public class PortfolioUnitOfWork : IUnitOfWork
    {
        private readonly PortfolioDbContext _dbContext;

        public PortfolioUnitOfWork(PortfolioDbContext dbContext)
        {
            _dbContext = dbContext;

            this.UsersRepository = new EfRepository<User, string>(_dbContext);
            this.ProjectsRepository = new EfRepository<Project, int>(_dbContext);
            this.ProjectDetailsRepository = new EfRepository<ProjectDetail, int>(_dbContext);
            this.ImagesRepository = new EfRepository<Image, int>(_dbContext);
            this.LinksRepository = new EfRepository<Link, int>(_dbContext);
            this.TagsRepository = new EfRepository<Tag, int>(_dbContext);
            
            this.ProjectDetailImageRepository = new EfRepository<ProjectDetailImage, int>(_dbContext);
            this.ProjectDetailTagRepository = new EfRepository<ProjectDetailTag, int>(_dbContext);
            this.ProjectDetailLinkRepository = new EfRepository<ProjectDetailLink, int>(_dbContext);
        }

        public IRepository<User, string> UsersRepository { get; }
        public IRepository<Project, int> ProjectsRepository { get; }
        public IRepository<ProjectDetail, int> ProjectDetailsRepository { get; }
        public IRepository<Image, int> ImagesRepository { get; }
        public IRepository<Link, int> LinksRepository { get; }
        public IRepository<Tag, int> TagsRepository { get; }
        public IRepository<ProjectDetailImage, int> ProjectDetailImageRepository { get; }
        public IRepository<ProjectDetailTag, int> ProjectDetailTagRepository { get; }
        public IRepository<ProjectDetailLink, int> ProjectDetailLinkRepository { get; }

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
