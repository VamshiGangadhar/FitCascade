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

interface Member {
  id: number;
  index: number;
  username: string;
  email: string;
  role: string;
  joinDate: string;
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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { toast } = useToast();

  const fetchMembers = async () => {
    try {
      const role = localStorage.getItem("role");
      const user = localStorage.getItem("user_id");
      if (role === "admin") {
        const response = await axios.get(
          `${API_END_POINT}/api/users/${user}/gym-members`
        );
        setMembers(response.data);
        console.log(response.data);
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

  const onAddSubmit = async (values: AddMemberFormValues) => {
    try {
      const user = localStorage.getItem("user_id");
      const payload = {
        ...values,
        joinDate: new Date().toISOString(),
        gym: user,
      };
      console.log(payload);
      await axios.post(`${API_END_POINT}/api/users/register`, {
        ...payload,
      });
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
      const user = localStorage.getItem("user_id");
      await axios.put(
        `${API_END_POINT}/api/users/${user}/gym-members/${selectedMember?.id}`,
        values
      );
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
          <CardTitle>Member List</CardTitle>
          <CardDescription>Manage your gym&apos;s members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Input className="max-w-sm" placeholder="Search members..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.index}>
                  <TableCell>{member.username}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
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
