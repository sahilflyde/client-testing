"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./sectionHeader";
import Typography from "./typography";

export default function TestimonialSection({
  label = "Testimonials",
  title = "What Our Users Say",
  subtitle = "Companies love the experience.",
  items = [
    {
      companyLogo: "https://placehold.co/100x40",
      company: "BlueOcean",
      quote: "Great experience and amazing results!",
      details:
        "Having all the tools in one place makes our hiring easier, faster, and more organized.",
      name: "Anna Roberts",
      role: "HR Manager at BrightPath",
      imageSrc: "https://placehold.co/600x900",
    },
    {
      companyLogo: "https://placehold.co/100x40",
      company: "InnovateX",
      quote: "The analytics give us a clear edge.",
      details:
        "Our team feels confident in every decision with detailed insights.",
      name: "David Chen",
      role: "Recruitment Lead",
      imageSrc: "https://placehold.co/600x900",
    },
  ],
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!items || items.length === 0) return null;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7 },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.6 },
    }),
  };

  const { quote, details, name, role, imageSrc, companyLogo } = items[index];

  return (
    <section className="testimonial-section mainSec py-20">
      <SectionHeader
        label={label}
        title={title}
        subtitle={subtitle}
        align="center"
      />

      {/* ARROWS */}
      <div className="arrows mt-6 flex items-center justify-center gap-4">
        <button
          className="prev"
          onClick={() => {
            setDirection(-1);
            setIndex((i) => Math.max(0, i - 1));
          }}
        >
          <Image
            src="https://placehold.co/50x50?text=<"
            alt="Previous"
            width={50}
            height={50}
          />
        </button>

        <button
          className="next"
          onClick={() => {
            setDirection(1);
            setIndex((i) => Math.min(items.length - 1, i + 1));
          }}
        >
          <Image
            src="https://placehold.co/50x50?text=>"
            alt="Next"
            width={50}
            height={50}
          />
        </button>
      </div>

      {/* CARD */}
      <div className="testimonial-card-container relative mt-12 flex justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="testimonial-card flex flex-col md:flex-row gap-8 items-center max-w-5xl"
          >
            {/* IMAGE */}
            <div className="image-wrapper">
              <Image
                src={imageSrc || "https://placehold.co/600x900"}
                alt={name}
                width={600}
                height={900}
                className="rounded-2xl object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="content-wrapper max-w-md">
              <div className="company-logo mb-4">
                <Image
                  src={companyLogo || "https://placehold.co/100x40"}
                  alt="Company Logo"
                  width={100}
                  height={40}
                  className="object-contain"
                />
              </div>

              <Typography variant="body-1" className="quote">
                {quote}
              </Typography>
              <Typography variant="body-4" className="details mt-3">
                {details}
              </Typography>

              <div className="author mt-6">
                <Typography variant="h6" className="name">
                  {name}
                </Typography>
                <Typography variant="body-5" className="role">
                  {role}
                </Typography>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="slick-dots flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            initial={false}
            animate={{
              width: i === index ? 24 : 8,
              opacity: i === index ? 1 : 0.4,
              backgroundColor: i === index ? "#CCEF55" : "#9CA3AF",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
