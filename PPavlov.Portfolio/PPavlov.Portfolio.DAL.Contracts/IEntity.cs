namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface IEntity<T>
    {
        T Id { get; }
    }
}
