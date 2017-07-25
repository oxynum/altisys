using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Altisys.Core.ViewModel.Ioc;
using StructureMap;

namespace Altisys.Core.ProjetV2
{
    public class Bootstrapper
    {
        static IContainer _container;
        public static IContainer Start()
        {
            _container = ObjectFactory.Container;
            return _container;
        }
    }
}