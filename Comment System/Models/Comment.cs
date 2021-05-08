using Comment_System.Areas.Identity.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Comment_System.Models
{
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }

        //[Required]
        //[Column(TypeName = "ntext")]
        //public string Body { get; set; }

        //public DateTime CommentTimeStamp { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }

        
    }
}
