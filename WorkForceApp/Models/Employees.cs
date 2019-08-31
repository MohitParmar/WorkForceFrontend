using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WorkForceApp.Models
{
    public class Employees
    {
        public Int64 EmpUnqID { get; set; }
        public string EmpName { get; set; }
        public string WrkGrp { get; set; }

        public string ContCode { get; set; }

        public string CostCode { get; set; }

        public string DeptDesc { get; set; }

        public string StatDesc { get; set; }

        public string GradeDesc { get; set; }

        public string CatDesc { get; set; }

        public string DesgDesc { get; set; }

        public DateTime JoinDt { get; set; }

        public bool Active { get; set; }

        public DateTime? AddDt { get; set; }

        public string AddId { get; set; }

        public DateTime? UpdDt { get; set; }

        public string UpdId { get; set; }

    }
}