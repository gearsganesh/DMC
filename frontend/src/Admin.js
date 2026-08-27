import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import "./Admin.css";

function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session || null);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) loadVehicles();
  }, [session]);

  useEffect(() => {
    if (selectedId) loadImages(selectedId);
    else setImages([]);
  }, [selectedId]);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedId),
    [vehicles, selectedId]
  );

  async function loadVehicles() {
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase
      .from("vehicles")
      .select("id, number, year, make, model, title, sort_order")
      .order("sort_order", { ascending: true })
      .order("year", { ascending: true });
    if (error) setMessage(error.message);
    else {
      setVehicles(data || []);
      if (!selectedId && data?.length) setSelectedId(data[0].id);
    }
    setLoading(false);
  }

  async function loadImages(vehicleId) {
    const { data, error } = await supabase
      .from("vehicle_images")
      .select("id, image_url, storage_path, caption, sort_order")
      .eq("vehicle_id", vehicleId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setMessage(error.message);
    else setImages(data || []);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    setBusy(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setVehicles([]);
    setImages([]);
    setSelectedId("");
  }

  async function handleUpload(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length || !selectedVehicle) return;
    setBusy(true);
    setMessage("");

    try {
      let nextOrder = images.length;
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${selectedVehicle.id}/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("vehicle-images")
          .upload(path, file, { upsert: false, contentType: file.type, cacheControl: "31536000" });
        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(path);

        const { error: insertError } = await supabase.from("vehicle_images").insert({
          vehicle_id: selectedVehicle.id,
          image_url: publicData.publicUrl,
          storage_path: path,
          caption: file.name,
          sort_order: nextOrder,
        });
        if (insertError) {
          await supabase.storage.from("vehicle-images").remove([path]);
          throw insertError;
        }
        nextOrder += 1;
      }
      await loadImages(selectedVehicle.id);
      setMessage("Images uploaded successfully.");
    } catch (error) {
      setMessage(error.message || "Upload failed.");
    } finally {
      event.target.value = "";
      setBusy(false);
    }
  }

  async function handleDelete(image) {
    if (!window.confirm("Delete this image permanently?")) return;
    setBusy(true);
    setMessage("");
    try {
      const { error: rowError } = await supabase.from("vehicle_images").delete().eq("id", image.id);
      if (rowError) throw rowError;
      if (image.storage_path) {
        const { error: storageError } = await supabase.storage
          .from("vehicle-images")
          .remove([image.storage_path]);
        if (storageError) throw storageError;
      }
      await loadImages(selectedVehicle.id);
      setMessage("Image deleted.");
    } catch (error) {
      setMessage(error.message || "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  if (loading && !session) {
    return <main className="dmc-admin"><div className="admin-card">Loading DMC administration…</div></main>;
  }

  if (!session) {
    return (
      <main className="dmc-admin">
        <form className="admin-card admin-login" onSubmit={handleLogin}>
          <div className="admin-kicker">DURAIMOHAN CLASSICS</div>
          <h1>Collection Office</h1>
          <p>Private administration for the DMC archive.</p>
          <label>Email<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          {message && <div className="admin-message error">{message}</div>}
          <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
          <a href="/">Return to archive</a>
        </form>
      </main>
    );
  }

  return (
    <main className="dmc-admin">
      <section className="admin-shell">
        <header className="admin-header">
          <div><div className="admin-kicker">DURAIMOHAN CLASSICS</div><h1>Collection Office</h1></div>
          <div className="admin-actions"><a href="/">View archive</a><button type="button" onClick={handleLogout}>Sign out</button></div>
        </header>
        <div className="admin-grid">
          <aside className="admin-card vehicle-list">
            <h2>Collection</h2>
            {loading ? <p>Loading vehicles…</p> : vehicles.map((vehicle) => (
              <button key={vehicle.id} className={vehicle.id === selectedId ? "vehicle-row active" : "vehicle-row"} onClick={() => setSelectedId(vehicle.id)} type="button">
                <span>{String(vehicle.number || "").padStart(2, "0")}</span>
                <strong>{vehicle.year} · {vehicle.make}{vehicle.model ? ` ${vehicle.model}` : ""}</strong>
              </button>
            ))}
          </aside>
          <section className="admin-card gallery-editor">
            <div className="editor-heading">
              <div><div className="admin-kicker">SELECTED VEHICLE</div><h2>{selectedVehicle ? `${selectedVehicle.year} · ${selectedVehicle.make}${selectedVehicle.model ? ` ${selectedVehicle.model}` : ""}` : "No vehicle"}</h2></div>
              <label className="upload-button">{busy ? "Working…" : "Add photographs"}<input type="file" accept="image/*" multiple disabled={busy || !selectedVehicle} onChange={handleUpload} /></label>
            </div>
            {message && <div className="admin-message">{message}</div>}
            <div className="image-grid">
              {images.map((image) => (
                <figure key={image.id} className="admin-image">
                  <img src={image.image_url} alt={image.caption || "DMC collection"} />
                  <button type="button" onClick={() => handleDelete(image)} disabled={busy}>Delete</button>
                </figure>
              ))}
              {!images.length && <div className="empty-gallery">No photographs stored yet. Add the first collection image.</div>}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Admin;
