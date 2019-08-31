using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WorkForceApp.Models;

namespace WorkForceApp.Controllers
{
    public class LoginController : Controller
    {
        private ApplicationDbContext _context;
        public LoginController()
        {
            _context = new ApplicationDbContext();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
            base.Dispose(disposing);
        }

        public ActionResult Index()
        {
            return View();
        }

        public static int iPasswordCounter = 0;

        [HttpPost]
        public ActionResult Users(Employees requestData)
        {
            try
            {
                Session["EmpUnqId"] = Convert.ToString(requestData.EmpUnqID);
                Session["EmpName"] = Convert.ToString(requestData.EmpName);
                return null;
            }
            catch { return null; }
        }

        public ActionResult UserLogin()
        {
            Response.AddHeader("Cache-Control", "no-cache, no-store,must-revalidate");
            Response.AddHeader("Pragma", "no-cache"); Response.AddHeader("Expires", "0");
            Session.Abandon();
            Session.Clear();
            Response.Cookies.Clear();
            Session.RemoveAll();
            Session["EmpUnqId"] = null;
            Session["EmpName"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}