using System.Web.Mvc;

namespace WorkForceApp.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult GetSupervisorList()
        {
            if (Session["EmpUnqId"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}