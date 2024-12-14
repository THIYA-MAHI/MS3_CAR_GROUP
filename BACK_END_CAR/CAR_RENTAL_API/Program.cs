using CAR_RENTAL_API.Database;
using CAR_RENTAL_API.IRepository;
using CAR_RENTAL_API.IServices;
using CAR_RENTAL_API.Repositories;
using CAR_RENTAL_API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using System.Text;
using System.IO;
using CAR_RENTAL_API.Repository;

namespace CAR_RENTAL_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

            // Swagger/OpenAPI configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add DbContext with SQL Server connection string
            builder.Services.AddDbContext<CarDbContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("CarRentalConnection")));

            // Dependency Injection for Repositories and Services
            builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
            builder.Services.AddScoped<ICustomerService, CustomerService>();

            builder.Services.AddScoped<IBrandRepository, BrandRepository>();
            builder.Services.AddScoped<IBrandServices, BrandService>();

            builder.Services.AddScoped<ICarRepository, CarRepository>();
            builder.Services.AddScoped<ICarService, CarService>();

            builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
            builder.Services.AddScoped<ICompanyServices, CompanyService>();

            builder.Services.AddScoped<IContactUsRepository, ContactUsRepository>();
            builder.Services.AddScoped<IContactUsServices, ContactUsService>();

            builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
            builder.Services.AddScoped<INotificationService, NotificationService>();

            builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
            builder.Services.AddScoped<IPaymentService, PaymentService>();

            builder.Services.AddScoped<IRentalRequestRepository, RentalRequestRepository>();
            builder.Services.AddScoped<IRentalRequestService, RentalRequestService>();

            builder.Services.AddScoped<IRentalRepository, RentalRepository>();
            builder.Services.AddScoped<IRentalService, RentalService>();

            builder.Services.AddScoped<IModelRepository, ModelRepository>();
            builder.Services.AddScoped<IModelService, ModelService>();

            // Configure JWT authentication
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            builder.Services.AddAuthentication()
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings["Issuer"],
                        ValidAudience = jwtSettings["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            // CORS configuration for frontend communication
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("AllowSpecificOrigins",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200") // Angular frontend URL
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });

            // Add logging services (optional, for debugging)
            builder.Services.AddLogging();

            var app = builder.Build();
            app.UseStaticFiles();


            // Ensure the necessary directories exist for saving images
            var imageDirectories = new[]
            {
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "carimages"),
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profiles"),
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "logos"),
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "customer-images")
            };

            foreach (var directory in imageDirectories)
            {
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
            }

            // Serve static files like images from these directories
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = "/images"
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Add exception handling middleware
            app.UseExceptionHandler("/error");
            app.UseStatusCodePagesWithReExecute("/error", "?statusCode={0}");

            // Ensure requests are secure (especially for production)
            app.UseHttpsRedirection();

            // Use CORS to allow frontend communication
            app.UseCors("AllowSpecificOrigins");

            // Authentication middleware
            app.UseAuthentication();
            app.UseAuthorization();



            // Map controllers to API routes
            app.MapControllers();

            // Run the app
            app.Run();
        }
    }
}
