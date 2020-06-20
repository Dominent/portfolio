using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Specifications
{
    public class MediaByLibraryId : BaseSpecification<Media, int>
    {
        public MediaByLibraryId(int libraryId)
            : base((x) => x.LibraryId == libraryId)
        {
        }
    }
}