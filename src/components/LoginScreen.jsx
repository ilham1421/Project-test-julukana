import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, AlertCircle } from "lucide-react";

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    // NIP validation
    if (!nip) {
      newErrors.nip = "NIP wajib diisi";
    } else if (!/^\d{18}$/.test(nip)) {
      newErrors.nip = "NIP harus 18 digit angka";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Store in localStorage
      localStorage.setItem("user", JSON.stringify({ email, nip }));

      toast({
        title: "Login Berhasil",
        description: "Selamat datang di sistem CBT BKN",
      });

      onLogin({ email, nip });
    } else {
      toast({
        title: "Gagal Login",
        description: "Mohon periksa kembali data yang dimasukkan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/011c2c6d-27ef-4f8d-9fed-8b3e9faf55e0/0e47151594839b2b2547063e005c6806.png"
                alt="Logo BKN"
                className="w-24 h-24 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              Login Hukum Julukana
            </CardTitle>
            <CardDescription>
              Masukkan email dan NIP Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nip">Nomor Induk Pegawai (NIP)</Label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  <Input
                    id="nip"
                    type="text"
                    placeholder="Masukkan 18 digit NIP"
                    className={`pl-10 ${errors.nip ? "border-red-500" : ""}`}
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    maxLength={18}
                  />
                </div>
                {errors.nip && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nip}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Masuk
              </Button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-4">
              Hubungi admin jika mengalami kesulitan login
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
