"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { AddMemberForm } from "./AddMemberForm";
import { EditMemberForm } from "./EditMemberForm";
import { API_END_POINT } from "../constants/constants";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
}

interface AssignedTrainer {
  _id: string;
  username: string;
  personalInfo: PersonalInfo;
}

interface MembershipDetails {
  plan: string;
  startDate: string;
  endDate: string;
  paymentStatus: string;
  assignedTrainer?: AssignedTrainer;
}

interface Member {
  _id: string;
  username: string;
  email: string;
  role: string;
  personalInfo: PersonalInfo;
  membershipDetails?: MembershipDetails;
  createdAt: string;
  status: string;
}

interface AddMemberFormValues {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface EditMemberFormValues {
  username: string;
  email: string;
  role: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { toast } = useToast();

  const fetchMembers = async () => {
    try {
      const role = localStorage.getItem("role");
      const gym = localStorage.getItem("gym");
      const token = localStorage.getItem("token");

      if (role === "admin") {
        const response = await axios.get(
          `${API_END_POINT}/api/users/gym/${gym}/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter to show only regular users
        const regularUsers = response.data.members.filter(
          (member: Member) => member.role === "user"
        );
        setMembers(regularUsers);
        setFilteredMembers(regularUsers);
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Only administrators can view members",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = members.filter(
      (member) =>
        member.username.toLowerCase().includes(query.toLowerCase()) ||
        member.email.toLowerCase().includes(query.toLowerCase()) ||
        member.personalInfo.firstName
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        member.personalInfo.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const onAddSubmit = async (values: AddMemberFormValues) => {
    try {
      const gym = localStorage.getItem("gym");
      const payload = {
        ...values,
        role: "user", // Force role to be user
        gym,
        status: "active",
      };

      await axios.post(`${API_END_POINT}/api/users/register`, payload);
      toast({
        title: "Success",
        description: "Member added successfully",
      });
      setIsAddOpen(false);
      fetchMembers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const onEditSubmit = async (values: EditMemberFormValues) => {
    try {
      // const gym = localStorage.getItem("gym");
      await axios.put(`${API_END_POINT}/api/users/${selectedMember?._id}`, {
        ...values,
        role: "user", // Ensure role stays as user
      });
      toast({
        title: "Success",
        description: "Member updated successfully",
      });
      setIsEditOpen(false);
      setSelectedMember(null);
      fetchMembers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button>Add New Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <AddMemberForm onSubmit={onAddSubmit} />
        </DialogContent>
      </Dialog>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gym Members</CardTitle>
          <CardDescription>Manage your regular gym members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Input
              className="max-w-sm"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership Plan</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Trainer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member._id}>
                  <TableCell>
                    {`${member.personalInfo.firstName} ${member.personalInfo.lastName}`.trim()}
                  </TableCell>
                  <TableCell>{member.username}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {member.membershipDetails?.plan || "N/A"}
                  </TableCell>
                  <TableCell>{formatDate(member.createdAt)}</TableCell>
                  <TableCell>
                    {member.membershipDetails?.assignedTrainer?.username ||
                      "Not Assigned"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {selectedMember && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
            </DialogHeader>
            <EditMemberForm
              initialValues={selectedMember}
              onSubmit={onEditSubmit}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
