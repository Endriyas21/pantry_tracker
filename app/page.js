"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Modal,
} from "@mui/material";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docref = doc(collection(firestore, "inventory"), item);
    const docsnap = await getDoc(docref);
    if (docsnap.exists()) {
      const { count } = docsnap.data();
      if (count === 1) {
        await deleteDoc(docref);
      } else {
        await setDoc(docref, { count: count - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item) => {
    const docref = doc(collection(firestore, "inventory"), item);
    const docsnap = await getDoc(docref);
    if (docsnap.exists()) {
      const { count } = docsnap.data();
      await setDoc(docref, { count: count + 1 });
    } else {
      await setDoc(docref, { count: 1 });
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      flexDirection="row"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      bgcolor="#2c3e50" // Stylish background color
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="#ecf0f1" // Stylish interior color
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button onClick={handleOpen} sx={{ bgcolor: "#3498db", color: "#fff" }}>
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" color="#333">
            Inventory
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              bgcolor="#f0f0f0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : "Unnamed Item"}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                {count}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (name) {
                      addItem(name);
                    } else {
                      console.error("Item name is empty or undefined");
                    }
                  }}
                >
                  Add More
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (name) {
                      removeItem(name);
                    } else {
                      console.error("Item name is empty or undefined");
                    }
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
