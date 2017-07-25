using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using StructureMap;
namespace Altisys.Core.ProjetV2
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static IContainer _container;
        protected void Application_Start()
        {
            //AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            //_container = Bootstrapper.Start();
        }
    }
}
