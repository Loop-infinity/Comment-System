using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Comment_System.Models
{
    public class CommentContent
    {
        [Key]
        public int CommentContentId { get; set; }

        [Required]
        public int CommentId { get; set; }

        [ForeignKey("CommentId")]
        public virtual Comment Comment { get; set; }

        [Required]
        [Column(TypeName = "ntext")]
        [MaxLength(200)]
        public string Body { get; set; }

        [Required]
        public DateTime CommentTimeStamp { get; set; }
    }
}
