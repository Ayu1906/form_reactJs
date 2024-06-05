import React, { useState } from 'react';
import backgroundImage from '../assets/images/latarbelakang.jpg';
function Regis() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Lakukan sesuatu dengan data form
      console.log(formData);
      setIsRegistered(true); // Set state untuk menampilkan popup
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.nama.trim()) {
      errors.nama = 'Nama harus diisi';
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email tidak valid';
      isValid = false;
    }

    if (!/^\d{11,12}$/.test(formData.telepon) || !/^\d+$/.test(formData.telepon)) {
      errors.telepon = 'Nomor telepon harus berupa 11 atau 12 angka dan tidak boleh ada karakter selain angka';
      isValid = false;
    }

    if (!formData.provinsi.trim()) {
      errors.provinsi = 'Provinsi harus diisi';
      isValid = false;
    }

    if (!formData.kota.trim()) {
      errors.kota = 'Kabupaten/kota harus diisi';
      isValid = false;
    }

    if (!formData.kecamatan.trim()) {
      errors.kecamatan = 'Kecamatan harus diisi';
      isValid = false;
    }

    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
      errors.password = 'Password harus memiliki minimal 8 karakter dan terdiri dari huruf dan angka';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password tidak sesuai';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // data provinsi, kota, dan kecamatan
  const provinsis = ['Jawa Barat'];
  const cities = {
    'Jawa Barat': ['Bekasi', 'Bandung'],
  };
  const kecamatans = {
    'Bekasi': ['Bekasi Barat', 'Bekasi Timur'],
    'Bandung': ['Bandung Utara', 'Bandung Selatan'],
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('${backgroundImage}')`}}>
      <div className="bg-white bg-opacity-75 p-4 m-5 rounded-lg shadow-lg max-w-lg w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-500">Registrasi Akun</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.nama ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input type="text" id="telepon" name="telepon" value={formData.telepon} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.telepon ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required />
            {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">Provinsi</label>
            <select id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.provinsi ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required>
              <option value="">Pilih Provinsi</option>
              {provinsis.map((provinsi, index) => (
                <option key={index} value={provinsi}>{provinsi}</option>
              ))}
            </select>
            {errors.provinsi && <p className="text-red-500 text-sm">{errors.provinsi}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="kota" className="block text-sm font-medium text-gray-700">Kabupaten/Kota</label>
            <select id="kota" name="kota" value={formData.kota} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.kota ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required>
              <option value="">Pilih Kabupaten/Kota</option>
              {formData.provinsi && cities[formData.provinsi].map((kota, index) => (
                <option key={index} value={kota}>{kota}</option>
              ))}
            </select>
            {errors.kota && <p className="text-red-500 text-sm">{errors.kota}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">Kecamatan</label>
            <select id="kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.kecamatan ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required>
              <option value="">Pilih Kecamatan</option>
              {formData.kota && kecamatans[formData.kota].map((kecamatan, index) => (
                <option key={index} value={kecamatan}>{kecamatan}</option>
              ))}
            </select>
            {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`} required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="mb-4">
          <button type="submit" className="w-full bg-slate-700 text-white py-3 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Daftar
          </button>
          </div>
        </form>
      </div>
      {isRegistered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md text-center">
            <h3 className="text-xl font-bold mb-4">Registrasi Berhasil</h3>
            <button
              onClick={() => setIsRegistered(false)}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Regis;
