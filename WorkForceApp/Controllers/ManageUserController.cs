using System.Web.Mvc;

namespace WorkForceApp.Controllers
{
    public class ManageUserController : Controller
    {
        // GET: ManageUser
        public ActionResult CreateSupervisor()
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
        public ActionResult AssignCostCodeSupervisor()
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
        public ActionResult ManageCostCodeHR()
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

        public ActionResult ResetAcceptance()
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