import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Mail, Phone, MapPin, Calendar, Save, X, User as UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { User, UpdateUser } from "@shared/schema";

interface ProfileSectionProps {
  user?: User;
  userId: number;
}

export default function ProfileSection({ user, userId }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    role: user?.role || "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateUser) => {
      const response = await apiRequest("PUT", `/api/users/${userId}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}`] });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updateUserMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      role: user?.role || "",
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Profile</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-600 hover:text-gray-900"
        >
          {isEditing ? <X className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={user.profileImage || ""}
              alt="Profile picture"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 mb-4"
            />
            <h4 className="text-xl font-medium text-gray-900 mb-1">
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-gray-600">{user.role}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-700">{user.phone}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-700">{user.location}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700">Joined {user.joinDate}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-gray-700">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-gray-700">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={updateUserMutation.isPending}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
