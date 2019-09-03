namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface IRepository<TEntity, TKey> : 
        IReadOnlyRepository<TEntity, TKey>,
        IWriteOnlyRepository<TEntity, TKey>
        where TEntity : IEntity<TKey>
    {
    }
}