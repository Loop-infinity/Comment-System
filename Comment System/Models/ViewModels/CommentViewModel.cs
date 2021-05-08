using Comment_System.Areas.Identity.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment_System.Models.ViewModels
{
    public class CommentViewModel
    {
        public ApplicationUser ApplicationUser { get; set; }
        public Comment Comment { get; set; }

        public CommentContent CommentContent { get; set; }
    }
}
