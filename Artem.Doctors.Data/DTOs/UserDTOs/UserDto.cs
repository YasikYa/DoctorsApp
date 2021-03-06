﻿using Artem.Doctors.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public UserRole Role { get; set; }
    }
}
