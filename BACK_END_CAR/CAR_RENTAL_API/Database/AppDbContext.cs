using CAR_RENTAL_API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CAR_RENTAL_API.Database
{
    public class CarDbContext : DbContext
    {
        public CarDbContext(DbContextOptions<CarDbContext> options) : base(options)
        {
        }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Modeltb> Models { get; set; }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Company> Companys { get; set; }
        public DbSet<ContactUs> Contacts { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<RentalRequest> RentalRequests { get; set; }
        public DbSet<Rental> Rentals { get; set; }


    



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ContactUs>().HasKey(c => c.ContactId);

            modelBuilder.Entity<Payment>().ToTable("Payments");

            modelBuilder.Entity<RentalRequest>()
                .Property(r => r.Status)
                .HasConversion<string>(); // Enum as string

            modelBuilder.Entity<Rental>().ToTable("RentalTables");

            modelBuilder.Entity<Car>()
            .HasOne(c => c.Brand) 
            .WithMany(b => b.Cars) 
            .HasForeignKey(c => c.BrandId); 

            modelBuilder.Entity<Car>()
            .HasOne(c => c.Modeltb) 
            .WithMany(b => b.Cars) 
            .HasForeignKey(c => c.ModeltbId); 

            modelBuilder.Entity<Rental>()
           .HasOne(r => r.Payment)
           .WithOne(p => p.Rental)
           .HasForeignKey<Payment>(p => p.RentalId);  // Foreign key defined in Payment



            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Company>()
               .Property(c => c.CompanyId)
               .ValueGeneratedOnAdd(); // Ensures that CompanyId is auto-incremented
        }


    }
}
