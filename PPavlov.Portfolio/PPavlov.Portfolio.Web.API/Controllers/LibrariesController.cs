using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Access.Specifications;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Models.Output;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    public class LibraryNode
    {
        [JsonProperty("value")]
        public LibraryOutputModel Value { get; set; }

        [JsonProperty("children")]
        public ICollection<LibraryNode> Children { get; set; }
    }

    public class LibraryOutputModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("parentId")]
        public int? ParentId { get; set; }

        [JsonProperty("media")]
        public IEnumerable<MediaOutputModel> Media { get; set; }

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; }

        public static LibraryOutputModel FromEntity(Library library)
        {
            return new LibraryOutputModel()
            {
                Id = library.Id,
                Name = library.Name,
                ParentId = library.ParentId,
                UpdatedAt = library.UpdatedAt,
                Media = library.Media.Select(MediaOutputModel.FromEntity).ToList()
            };
        }
    }

    public class LibraryInputModel
    {
        [Required]
        public string Name { get; set; }

        public int? ParentId { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class LibrariesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public LibrariesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]LibraryInputModel libraryInputModel)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState.Values);
            }

            var library = new Library()
            {
                Name = libraryInputModel.Name,
                ParentId = libraryInputModel.ParentId
            };

            _unitOfWork.LibraryRepository.Add(library);

            await _unitOfWork.CompleteAsync();

            var authority = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";

            // TODO(PPavlov): Add output model
            return this.Created($"{authority}/api/libraries/{library.Id}", null);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var libraries = await _unitOfWork.LibraryRepository.ApplyAsync(new LibraryWithMediaSpecification());

            var root = new LibraryNode()
            {
                Value = LibraryOutputModel.FromEntity(libraries.FirstOrDefault(x => x.Parent == null)),
                Children = new List<LibraryNode>()
            };

            var librariesByParentId = libraries
                .Where(x => x.Parent != null)
                .GroupBy(x => x.ParentId)
                .ToDictionary(x => x.Key, v => v.ToList());

            foreach (var parentId in librariesByParentId.Keys)
            {
                var parent = DFS(root, (n) => n.Value.Id.Equals(parentId));

                foreach (var child in librariesByParentId[parentId])
                {
                    parent.Children.Add(new LibraryNode()
                    {
                        Value = LibraryOutputModel.FromEntity(child),
                        Children = new List<LibraryNode>()
                    });
                }
            }

            return this.Ok(JsonConvert.SerializeObject(new List<LibraryNode>() { root }));
        }

        private static LibraryNode DFS(LibraryNode root, Predicate<LibraryNode> predicate)
        {
            var stack = new Stack<LibraryNode>();
            stack.Push(root);

            while (stack.Count != 0)
            {
                var node = stack.Pop();

                if (predicate.Invoke(node))
                {
                    return node;
                }

                foreach (var child in node.Children)
                {
                    stack.Push(child);
                }
            }

            return null;
        }
    }
}
