using System;

namespace WorkForceApp.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public Int64 UserId { get; set; }
        public string RoleDesc { get; set; }
    }
}