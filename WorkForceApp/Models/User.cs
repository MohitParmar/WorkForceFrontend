using System;
using System.Collections.Generic;

namespace WorkForceApp.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string password { get; set; }
        public string EmpUnqID { get; set; }
        public string EmpName { get; set; }
        public List<UserCostCode> CostCodes { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public bool Active { get; set; }
        public string WrkGrp { get; set; }
        public string ContCode { get; set; }
        public string CostCode { get; set; }
        public string DeptDesc { get; set; }
        public string StatDesc { get; set; }
        public string GradeDesc { get; set; }
        public string CatDesc { get; set; }
        public string DesgDesc { get; set; }
        public string EmpCode { get; set; }
        public string SAPID { get; set; }
        public decimal Basic { get; set; }
        public DateTime JoinDt { get; set; }
    }
}