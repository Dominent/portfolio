using System;

namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface IEntity<T>
    {
        T Id { get; }

        DateTime CreatedAt { get; set; }

        DateTime UpdatedAt { get; set; }
    }
}
