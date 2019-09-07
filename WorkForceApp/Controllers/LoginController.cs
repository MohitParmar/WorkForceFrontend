using System;
using System.Collections.Generic;
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
        public ActionResult Users(User requestData)
        {
            try
            {
                Session["UserId"] = Convert.ToString(requestData.UserId);
                Session["EmpUnqId"] = Convert.ToString(requestData.EmpUnqID);
                Session["EmpName"] = Convert.ToString(requestData.EmpName);
                Session["Pass"] = Convert.ToString(requestData.password);
                Session["WrkGrp"] = Convert.ToString(requestData.WrkGrp);

                List<UserRole> lstUserRole = new List<UserRole>();
                lstUserRole = requestData.UserRoles;

                int lnt = lstUserRole.Count;

                bool IsAdmin = false, IsHrUser = false, IsSupervisor = false;

                for (int i = 0; i < lstUserRole.Count; i++)
                {
                    if (lstUserRole[i].RoleId == 1) { IsAdmin = true; }
                    if (lstUserRole[i].RoleId == 2) { IsHrUser = true; }
                    if (lstUserRole[i].RoleId == 3) { IsSupervisor = true; }
                }

                if (IsAdmin == true)
                {
                    Session["IsAdmin"] = "Admin";
                }
                else
                {
                    if (IsHrUser == true && IsSupervisor == true)
                    {
                        Session["IsHrSup"] = "IsHrSup";
                    }
                    else
                    {
                        if (IsHrUser == true)
                        {
                            Session["IsHrUser"] = "HR";
                        }
                        if (IsSupervisor == true)
                        {
                            Session["IsSupervisor"] = "Supervisor";
                        }
                    }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        public ActionResult UserLogin()
        {
            Response.AddHeader("Cache-Control", "no-cache, no-store,must-revalidate");
            Response.AddHeader("Pragma", "no-cache"); Response.AddHeader("Expires", "0");
            Session.Abandon();
            Session.Clear();
            Response.Cookies.Clear();
            Session.RemoveAll();
            Session["UserId"] = null;
            Session["EmpUnqId"] = null;
            Session["EmpName"] = null;
            Session["Pass"] = null;
            Session["WrkGrp"] = null;
            Session["IsAdmin"] = null;
            Session["IsHrUser"] = null;
            Session["IsSupervisor"] = null;
            Session["IsHrSup"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}