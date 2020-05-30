using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    public class StoryController : ApiController
    {
        private LearnerDBEntities db = new LearnerDBEntities();

        // GET: api/Story
        public IQueryable<Tbl_Story> GetTbl_Story()
        {
            return db.Tbl_Story;
        }

        // GET: api/Story/5
        //to get all users from db
        [ResponseType(typeof(Tbl_Story))]
        public IHttpActionResult GetTbl_Story(int id)
        {
            Tbl_Story tbl_Story = db.Tbl_Story.Find(id);
            if (tbl_Story == null)
            {
                return NotFound();
            }

            return Ok(tbl_Story);
        }

        // PUT: api/Story/5
        //to update user
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTbl_Story(int id, Tbl_Story tbl_Story)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbl_Story.ID)
            {
                return BadRequest();
            }

            db.Entry(tbl_Story).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tbl_StoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Story
        //to add users
        [ResponseType(typeof(Tbl_Story))]
        public IHttpActionResult PostTbl_Story(Tbl_Story tbl_Story)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tbl_Story.Add(tbl_Story);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tbl_Story.ID }, tbl_Story);
        }

        // DELETE: api/Story/5
        //to delete user
        [ResponseType(typeof(Tbl_Story))]
        public IHttpActionResult DeleteTbl_Story(int id)
        {
            Tbl_Story tbl_Story = db.Tbl_Story.Find(id);
            if (tbl_Story == null)
            {
                return NotFound();
            }

            db.Tbl_Story.Remove(tbl_Story);
            db.SaveChanges();

            return Ok(tbl_Story);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Tbl_StoryExists(int id)
        {
            return db.Tbl_Story.Count(e => e.ID == id) > 0;
        }
    }
}