using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using TestProjectWebApi.Data;
using TestProjectWebApi.Utils;

namespace TestProjectWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddHttpClient("Mail", options => options.BaseAddress = new Uri(Configuration.GetConnectionString("MailConnection")));
            services.AddDbContext<SqldbTngAzpaasCldPrakharContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            .LogTo(Console.WriteLine,LogLevel.Information));
            services.AddControllers();
            services.AddScoped<RazorPay_Order>(provider => 
            new RazorPay_Order(Configuration.GetConnectionString("RazorPay_Key"),
                               Configuration.GetConnectionString("RazorPay_Secret")));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TestProjectWebApi", Version = "v1" });
            });
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.WithOrigins("https://onlineshoppingp98.azurewebsites.net", "http://localhost:4200")
                       .AllowAnyMethod();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("MyPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TestProjectWebApi v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
        }
    }
}
