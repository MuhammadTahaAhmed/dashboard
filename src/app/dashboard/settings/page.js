"use client";

import { useEffect, useMemo, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Separator from "@/components/ui/Separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);

    // Profile state
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    // Account state
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Notifications state
    const [notifyEmail, setNotifyEmail] = useState(true);
    const [notifySms, setNotifySms] = useState(false);
    const [notifyPush, setNotifyPush] = useState(true);

    // Appearance state
    const [theme, setTheme] = useState("system");
    const [density, setDensity] = useState("comfortable");

    const avatarObjectUrl = useMemo(() => (avatarFile ? URL.createObjectURL(avatarFile) : ""), [avatarFile]);

    useEffect(() => {
        if (avatarObjectUrl) {
            setAvatarPreview(avatarObjectUrl);
            return () => URL.revokeObjectURL(avatarObjectUrl);
        }
    }, [avatarObjectUrl]);

    function validateEmail(value) {
        return /.+@.+\..+/.test(value);
    }

    async function pretendNetworkDelay(ms = 800) {
        await new Promise(r => setTimeout(r, ms));
    }

    async function handleSaveProfile(e) {
        e.preventDefault();
        if (!name.trim()) return alert("Name is required");
        setSaving(true);
        try {
            await pretendNetworkDelay();
            alert("Profile saved");
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveAccount(e) {
        e.preventDefault();
        if (!validateEmail(email)) return alert("Enter a valid email");
        if (newPassword || confirmPassword) {
            if (newPassword.length < 8) return alert("New password must be at least 8 characters");
            if (newPassword !== confirmPassword) return alert("Passwords do not match");
            if (!currentPassword) return alert("Enter current password to change it");
        }
        setSaving(true);
        try {
            await pretendNetworkDelay();
            alert("Account settings saved");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveNotifications(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await pretendNetworkDelay();
            alert("Notification preferences saved");
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveAppearance(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await pretendNetworkDelay();
            document.documentElement.dataset.theme = theme;
            alert("Appearance saved");
        } finally {
            setSaving(false);
        }
    }

	return (
		<div className="card">
            <div className="card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
			<h1 className="hero-title" style={{ fontSize: 28 }}>Settings</h1>
                    <p className="hero-subtitle" style={{ marginTop: 8 }}>Manage your profile, account, and preferences.</p>
                </div>
                <Button size="sm" variant="ghost" disabled={saving}>{saving ? "Saving…" : "Saved"}</Button>
            </div>

            <div className="card-body" style={{ marginTop: 16 }}>
                <Tabs defaultValue="profile" className="settings-tabs">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    </TabsList>

                    <Separator className="mt-2" />

                    <TabsContent value="profile">
                        <form onSubmit={handleSaveProfile} className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Avatar src={avatarPreview} alt={name || "Avatar"} size={64} />
                                <div style={{ display: "grid", gap: 8 }}>
                                    <Input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
                                    <p className="card-text">PNG, JPG up to 2MB.</p>
                                </div>
                            </div>
                            <div>
                                <label className="label" htmlFor="name">Name</label>
                                <Input id="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="label" htmlFor="bio">Bio</label>
                                <textarea id="bio" className="input" rows={4} placeholder="A short bio" value={bio} onChange={e => setBio(e.target.value)} />
                            </div>
                            <div className="card-actions" style={{ display: "flex", gap: 8 }}>
                                <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</Button>
                                <Button type="button" variant="ghost" onClick={() => { setName(""); setBio(""); setAvatarFile(null); setAvatarPreview(""); }}>Reset</Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="account">
                        <form onSubmit={handleSaveAccount} className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
                            <div>
                                <label className="label" htmlFor="email">Email</label>
                                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <Separator />
                            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <div>
                                    <label className="label" htmlFor="currentPassword">Current password</label>
                                    <Input id="currentPassword" type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                </div>
                                <div />
                                <div>
                                    <label className="label" htmlFor="newPassword">New password</label>
                                    <Input id="newPassword" type="password" placeholder="At least 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label" htmlFor="confirmPassword">Confirm new password</label>
                                    <Input id="confirmPassword" type="password" placeholder="Repeat new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="card-actions" style={{ display: "flex", gap: 8 }}>
                                <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save account"}</Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <form onSubmit={handleSaveNotifications} className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p className="card-title">Email notifications</p>
                                    <p className="card-text">Receive updates via email.</p>
                                </div>
                                <input type="checkbox" checked={notifyEmail} onChange={e => setNotifyEmail(e.target.checked)} />
                            </div>
                            <Separator />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p className="card-title">SMS notifications</p>
                                    <p className="card-text">Receive messages to your phone.</p>
                                </div>
                                <input type="checkbox" checked={notifySms} onChange={e => setNotifySms(e.target.checked)} />
                            </div>
                            <Separator />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <p className="card-title">Push notifications</p>
                                    <p className="card-text">Get alerts in your browser.</p>
                                </div>
                                <input type="checkbox" checked={notifyPush} onChange={e => setNotifyPush(e.target.checked)} />
                            </div>
                            <div className="card-actions" style={{ display: "flex", gap: 8 }}>
                                <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save preferences"}</Button>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="appearance">
                        <form onSubmit={handleSaveAppearance} className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
                            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <div>
                                    <label className="label" htmlFor="theme">Theme</label>
                                    <select id="theme" className="input" value={theme} onChange={e => setTheme(e.target.value)}>
                                        <option value="system">System</option>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label" htmlFor="density">Density</label>
                                    <select id="density" className="input" value={density} onChange={e => setDensity(e.target.value)}>
                                        <option value="comfortable">Comfortable</option>
                                        <option value="compact">Compact</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-actions" style={{ display: "flex", gap: 8 }}>
                                <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save appearance"}</Button>
                                <Button type="button" variant="ghost" onClick={() => { setTheme("system"); setDensity("comfortable"); }}>Reset</Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
		</div>
	);
}
