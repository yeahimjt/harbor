import { Button } from '@/components/ui/button';
import {
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FormEvent, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import AuthButtons from '../authbuttons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { useDialogStore } from '@/app/states';
const Auth = () => {
  const [user, isLoading] = useAuthState(auth);
  const { closeDialog, isOpen } = useDialogStore();
  useEffect(() => {
    console.log(user);
    if (user) {
      closeDialog();
    }
  }, [user, isOpen]);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: '', email: '', password: '' });

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      //   await createUserWithEmailAndPassword(formData.email, formData.password);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLogin = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    // signInWithEmailAndPassword(formData.email, formData.password);
  };
  return (
    <DialogContent>
      <DialogHeader className='mx-auto my-2'>
        <Tabs defaultValue='account' className=' w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>Log In</TabsTrigger>
            <TabsTrigger value='password'>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Card className=' border-0 shadow-none'>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='email_address'>Email Address</Label>
                  <Input
                    id='email_address'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.currentTarget.value })
                    }
                  />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.currentTarget.value,
                      })
                    }
                  />
                  {/* {errorLogin && (
                    <p className='text-center text-red-500'>
                      {FIREBASE_ERRORS[errorLogin.code]}
                    </p>
                  )} */}
                </div>
              </CardContent>
              <CardFooter>
                <Button className='bg-blue-cta' onClick={handleLogin}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value='password'>
            <Card className='border-0 shadow-none'>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='full_name'>Full Name</Label>
                  <Input
                    id='full_name'
                    value={formData.name}
                    type='text'
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.currentTarget.value })
                    }
                  />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='email_address'>Email Address</Label>
                  <Input
                    id='email_address'
                    value={formData.email}
                    type='email'
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.currentTarget.value })
                    }
                  />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    value={formData.password}
                    type='password'
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.currentTarget.value,
                      })
                    }
                  />
                  {/* {error && (
                    <p className='text-center text-red-500'>
                      {FIREBASE_ERRORS[error.code]}
                    </p>
                  )} */}
                </div>
              </CardContent>
              <CardFooter>
                <Button className='bg-blue-cta' onClick={handleSubmit}>
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <Separator />
        <AuthButtons />
      </DialogHeader>
    </DialogContent>
  );
};

export default Auth;
