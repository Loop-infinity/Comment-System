using Comment_System.Areas.Identity.Data;
using Comment_System.Data;
using Comment_System.Models;
using Comment_System.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment_System.Controllers
{
  
    public class CommentController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }
        public IActionResult Index()
        {
            var model = _db.Comment
                        .Join(_db.ApplicationUser, p => p.UserId, n => n.Id,
                        ((comment, applicationUser) => new CommentViewModel { Comment = comment, ApplicationUser = applicationUser }))
                        .ToList();
       
            List<CommentViewModel> commentViewModel = new List<CommentViewModel>();
            var commentCon = _db.CommentContent.OrderByDescending(c => c.CommentTimeStamp);

            //commentViewModel.Comment = comment;
            for (int i=0; i<model.Count;i++)
            {
                CommentViewModel cvm = new CommentViewModel();

                cvm.ApplicationUser = model[i].ApplicationUser;
                //cvm.Comment = comments[i];
                cvm.Comment = model[i].Comment;

                var cc = _db.CommentContent.Where(c => c.CommentId == model[i].Comment.CommentID).OrderByDescending(c => c.CommentTimeStamp).FirstOrDefault();
                cvm.CommentContent = cc;
                commentViewModel.Add(cvm);

            }

            /*var model = _db.Comment
                        .Join(_db.CommentContent, p => p.CommentID, n => n.CommentId,
                        ((comment, commentContent) => new CommentViewModel { Comment = comment, CommentContent = commentContent }))
                        .ToList(); */
            
            //var comments = await _db.Comment.ToListAsync();
            return View(commentViewModel);
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddComment(CommentViewModel commentViewModel)
        {
            if(ModelState.IsValid)
            {
                Comment comment = new Comment();
                CommentContent commentContent = new CommentContent();

                //Add Comment
                ApplicationUser usr = await _userManager.GetUserAsync(User);
                comment.UserId = usr.Id;
                await _db.Comment.AddAsync(comment);
                await _db.SaveChangesAsync();

                //Add Content
                commentContent.CommentId = comment.CommentID;
                commentContent.Body = commentViewModel.CommentContent.Body;
                commentContent.CommentTimeStamp = DateTime.Now;


                await _db.CommentContent.AddAsync(commentContent);
                await _db.SaveChangesAsync();
                
            }
            return RedirectToAction("Index");
        }


        public IActionResult Edit(int? id)
        {
            if(id != null)
            {
                return View(_db.CommentContent.Find(id));
            }


            return NotFound();
        }

        public async Task<IActionResult> Update(CommentContent commentContent)
        {
            if (ModelState.IsValid)
            {

                //Add Comment


                //Add Content
                commentContent.CommentTimeStamp = DateTime.Now;


                await _db.CommentContent.AddAsync(commentContent);
                await _db.SaveChangesAsync();

            } 
            return RedirectToAction("Index");
        }

        public IActionResult getRevisionHistory(int? id)
        {
            if(id != null)
            {
                var commentContents = _db.CommentContent.Where(c => c.CommentId == id).OrderByDescending(c => c.CommentTimeStamp).ToList();
                return Json(commentContents);
            }
            return NotFound();
            
        }

    }

}
