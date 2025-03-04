import { MdArchitecture } from "react-icons/md";
import { MdImagesearchRoller } from "react-icons/md";
import { GiAnarchy } from "react-icons/gi";
import { SiTreyarch } from "react-icons/si";
import { TbEyeSearch } from "react-icons/tb";
import { MdDesignServices } from "react-icons/md";
import { SiAffinitydesigner } from "react-icons/si";
import { SiAltiumdesigner } from "react-icons/si";
import { SiAntdesign } from "react-icons/si";
import ServiceItem from "../components/ServiceItem.jsx";

const Services = () => {
  return (
    <div className="h-full w-screen bg-white relative pb-8 md:pt-16 md:pb-0">
      <div className="container xl:max-w-6xl mx-auto px-4">
        {/* Heading start */}
        <header className="text-center mx-auto mb-12 lg:px-20">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-amber-600">
            What We Do
          </h2>
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">
            {/* Save time managing advertising &amp; Content for your business. We */}
            We offer full-service interior design and construction for homes
          </p>
        </header>
        {/* End heading */}
        {/* row */}
        <div className="flex flex-wrap flex-row -mx-4 text-center">
          {/* Service Blocks */}
          {/* Service 1 */}
          <ServiceItem
            icon={<MdArchitecture size="28" />}
            title="Interior Design Consultation"
            desc="Space , layout planning  
            Color , material selection 
            Decor recommendations"
          />

          <ServiceItem
            icon={<MdImagesearchRoller size="28" />}
            title="Pre-Design"
            desc="Site analysis assessment
            Concept development sketches"
          />

          <ServiceItem
            icon={<GiAnarchy size="28" />}
            title="Architectural Design"
            desc="Floor plan development
            3D modeling and rendering
            Exterior elevation design"
          />

          <ServiceItem
            icon={<SiTreyarch size="28" />}
            title="Construction Mangement"
            desc="Project planning scheduling
            Cost estimation and budget"
          />
          <ServiceItem
            icon={<MdDesignServices size="28" />}
            title="General Contracting"
            desc="Full-scale construction home
            Plumbers , electricians , carpenters
            Quality control assurance"
          />
          <ServiceItem
            icon={<SiAffinitydesigner size="28" />}
            title="Interior Renovation"
            desc="Demolition of existing structures
            Renovation existing spaces"
          />
          <ServiceItem
            icon={<SiAltiumdesigner size="28" />}
            title="Exterior Construction"
            desc="Building exterior walls ,roofs
            Outdoor space design"
          />
          <ServiceItem
            icon={<SiAntdesign size="28" />}
            title="Custom Furniture Cabinetry"
            desc="Fabrication of custom furniture
            Built-in cabinets and fixtures"
          />
          <ServiceItem
            icon={<TbEyeSearch size="28" />}
            title="Post-Construction "
            desc="Final quality inspections
            Warrenty and maintenance"
          />

          {/* Service 2 */}
          {/* ... (similar structure for other services) */}
        </div>
        {/* end row */}
      </div>
    </div>
  );
};

export default Services;