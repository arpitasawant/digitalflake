import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import imageIcon from '../../assets/ImageIcon.png';
import Group from '../../assets/Group.png';
import namelogo from '../../assets/editlogo.png';
const EditUser: React.FC = () => {
  interface FormData {
    name: string;
    mobile: string;
    email: string;
    role: string;
    status: string;
    image: File | null;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    role: 'Admin',
    status: 'Active',
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    document.getElementById('file-input')?.click();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('status', formData.status);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post('https://your-api-url.com/create-user', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User created successfully:', response.data);
      setFormData({ name: '', mobile: '', email: '', role: 'Admin', status: 'Active', image: null });
      setPreview(null);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const fetchRoles = async () => {
    const arr = ['Admin', 'SuperAdmin', 'Caller', 'Account'];
    setRoles(arr);
  };

  const fetchStatus = async () => {
    const arr1 = ['active', 'inactive'];
    setStatus(arr1);
  };
  useEffect(() => {
    fetchRoles();
    fetchStatus();
  }, []);
  

  return (
    <div className='p-6'>
      <div className='bg-purple-700 flex items-center gap-24 h-12'>
        <img src={namelogo} alt="Back" className="w-36" />
        
      </div>
      <p className='font-semibold text-black text-2xl'>Edit User</p>
      <form onSubmit={handleSubmit} className='mt-6'>
        <div className='flex flex-wrap gap-6'>
          {/* Name Field */}
          
          <div className='flex w-[31%] max-w-[33%] min-w-[200px] relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Name</label>
            <input
              className='h-12 w-full pl-3 border border-[#9F9F9F] rounded-lg outline-none'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile Field */}
          <div className='flex w-[31%] max-w-[33%] min-w-[200px] relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Mobile</label>
            <input
              className='h-12 w-full pl-3 border border-[#9F9F9F] rounded-lg outline-none'
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Field */}
          <div className='flex w-[31%] max-w-[33%] min-w-[200px] relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Email-Id</label>
            <input
              className='h-12 w-full pl-3 border border-[#9F9F9F] rounded-lg outline-none'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-6 mt-6'>
          {/* Role Field */}
          <div className='flex w-[31%] max-w-[33%] min-w-[200px] relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Role</label>
            <select
              className='h-12 w-full pl-3 border border-[#9F9F9F] rounded-lg outline-none'
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

              
          {/* Image Upload */}
          <div className='flex w-[31%] max-w-[33%] flex gap-4 relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Upload Image</label>
            <div className='flex-1 flex items-center justify-center border border-[#9F9F9F] rounded-lg py-4'>
              <img src={imageIcon} alt="Image" />
            </div>
            <div className='flex-1 border border-[#9F9F9F] border-dotted rounded-lg'>
              <div className='flex-1 flex items-center justify-center py-4'>
                <img src={Group} alt="Upload" onClick={handleUploadImage} />
              </div>
              <input
                type="file"
                id="file-input"
                className='hidden'
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className='text-center text-sm'>Upload Maximum allowed file size is 10MB</p>
            </div>
          </div>
          <div className='flex w-[31%] max-w-[33%] min-w-[200px] relative'>
            <label className='absolute left-3 -top-2.5 bg-white px-2 text-sm'>Status</label>
            <select
              className='h-12 w-full pl-3 border border-[#9F9F9F] rounded-lg outline-none'
              name="role"
              value={formData.status}
              onChange={handleInputChange}
            >
              {status.map((stat) => (
                <option key={stat} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button Container */}
        <div className='absolute bottom-6 right-6 flex gap-4'>
          <button type="button" className='bg-[#767676] text-white py-2 px-12 rounded-lg rounded-3xl text-center'>
            Cancel
          </button>
          <button type="submit" className='bg-[#662671] text-white py-2 px-12 rounded-lg rounded-3xl text-center'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;