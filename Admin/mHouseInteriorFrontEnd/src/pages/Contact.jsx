import { useState } from "react";
import  {info,emailPayloadInfo}  from "../config.json";
import { sendEmail } from "../api's/service";
import { ToastContainer, toast } from 'react-toastify';
import zod from 'zod'
const Contact = () => {
  const personalInformation=info;

  const contactSchema = zod.object({
    firstName: zod.string().min(1,"First Name is required"),
    lastName: zod.string().min(1,"Last name is required"),
    email:zod.string().email("Invalid Email address"),
    enquiryDetails: zod.string().min(5,"Enquiry details must be at least 5 characters"),
    phone: zod.string().regex(/^\d{10}$/, "Phone number must be 10 digits")
  })

  const [errors,setErrors]=useState({});

  const [emailInfo, setEmailInfo]=useState({
    firstName: "",
    lastName:"",
    email:"",
    enquiryDetails:"",
    phone:""
  });
  function handleInputChange(e){
    const {name, value}=e.target;
    setEmailInfo((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  async function handleSubmit(event){
    event.preventDefault();
    const result = contactSchema.safeParse(emailInfo);
    if(!result.success){
      const errorMessages = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(errorMessages);
      return;
    }
    setErrors({})
      try {
        const emailHtml = generateEmailTemplate(emailInfo);
        const payload = {
          to : emailPayloadInfo.email,
          subject: emailPayloadInfo.subject,
          text: `${emailPayloadInfo.text}:${JSON.stringify(emailInfo)}`,
          html:emailHtml
        }
        setEmailInfo({
          firstName: "",
          lastName:"",
          email:"",
          enquiryDetails:"",
          phone:""
        })
        const response = await sendEmail(payload);
        if(response){
          toast.success("Email sent successfully!", {
            position: "top-right",
            autoClose: 2000, // Auto close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("Failed to send email. Please try again.");
      }
  }
  const generateEmailTemplate = (emailInfo) => {
    const { firstName, lastName, email, enquiryDetails, phone } = emailInfo;
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
          <h1 style="color: #d97706;">New Project Inquiry</h1>
          <p><strong>First Name:</strong> ${firstName || "N/A"}</p>
          <p><strong>Last Name:</strong> ${lastName || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Enquiry Details:</strong> ${enquiryDetails || "N/A"}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p>Thank you for providing your details. We will reach out to you shortly!</p>
        </div>
      </div>
    `;
  };
  
  return (
    <div className="p-7">
      <div>
        <div className="text-4xl font-semibold p-4 text-gray-700 text-center mb-4">Contact Us</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-200 rounded">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope mt-2 mr-2" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
              <div className="font-semibold text-xl">
              Email
              </div>
            </div>
            <div className="mt-2 text-center">
              {personalInformation.email1}
            </div>
            <div className="text-center">
              {personalInformation.email2}
            </div>
          </div>
          <div className="p-4 bg-slate-200 rounded">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone mt-2 mr-2" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg>
              <div className="font-semibold text-xl text-center">
              Phone
              </div>
            </div>
            <div className="mt-2 text-center">
              {personalInformation.phone}
            </div>
          </div>
          <div className="p-4 bg-slate-200 rounded">
            <a 
              href="https://www.instagram.com/mhouseinterior/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center text-center text-gray-800 hover:text-amber-600"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram mt-2 mr-2" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                </svg>
                <div className="font-semibold text-xl">Instagram</div>
              </div>
              <div className="mt-2">
                {personalInformation.instagram || "Visit our Instagram"}
              </div>
            </a>
          </div>

        </div>
      </div>
      <div className="p-2 mt-7">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-700 text-center">
              WE’D LOVE TO HEAR FROM YOU.
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-700 text-center">
              Interested in learning more? Please complete the form below, and a member of our team will connect with you shortly.
            </p>

            <div className="md:px-40 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-700">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={emailInfo.firstName}
                    onChange={handleInputChange}
                    aria-describedby="first-name-error"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName && (
                    <p id="first-name-error" className="text-red-500 text-sm">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-700">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={emailInfo.lastName}
                    onChange={handleInputChange}
                    aria-describedby="last-name-error"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName && (
                    <p id="last-name-error" className="text-red-500 text-sm">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={emailInfo.email}
                    onChange={handleInputChange}
                    aria-describedby="email-error"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="col-span-full">
                <label htmlFor="enquiry-details" className="block text-sm font-medium leading-6 text-gray-700">
                  Enquiry Details
                </label>
                <div className="mt-2">
                  <textarea
                    id="enquiry-details"
                    name="enquiryDetails"
                    rows={3}
                    value={emailInfo.enquiryDetails}
                    onChange={handleInputChange}
                    aria-describedby="enquiry-details-error"
                    className="block w-full px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  {errors.enquiryDetails && (
                    <p id="enquiry-details-error" className="text-red-500 text-sm">
                      {errors.enquiryDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-700">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={emailInfo.phone}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      handleInputChange(e);
                    }}
                    aria-describedby="phone-error"
                    className="block w-full px-2 outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      </div>
    </div>
  );
};
export default Contact;
