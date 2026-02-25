/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { skills } from '@/lib/data';
import {
  ChevronRight,
  Code2,
  Frame,
  Eye,
  MonitorSmartphone,
  Send,
  Mail,
  User,
  MessageSquare,
  Reply,
  ChevronDown,
  Clock
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";
import {
  type Comment,
  type FetchCommentsResponse,
  type PostCommentResponse,
  type CommentFormData,
  type ReplyFormData,
  type MessageState
} from '@/types';


const categories = [
  { name: 'All', value: 'all' },
  { name: 'Frontend', value: 'frontend' },
  { name: 'Backend', value: 'backend' },
  { name: 'Database', value: 'database' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'Tools', value: 'tools' },
  { name: 'CMS', value: 'cms' },
];

const projects = [
  {
    title: "KLIP",
    description: "KLIP (Klate Local Intelligence Platform) is a comprehensive AI platform that provides a wide range of AI services and solutions to empower businesses and individuals in leveraging the power of artificial intelligence.",
    image: "/assets/projects/klip-project.webm",
    href: "https://klaxai.vercel.app/",
  },
  {
    title: "Montera",
    description: "A digital map service empowering the sugarcane industry with fast, data-driven decisions through spatial analytics.",
    image: "/assets/projects/akara-webm.webm",
    href: "https://montera-alpha.digii.co.id/",
  },
  {
    title: "ETERA",
    description: "ETERA is a digital ecosystem that enhances integration, accuracy, expertise, and efficiency to achieve National Sugar Self-Sufficiency.",
    image: "/assets/projects/etera-webm.webm",
    href: "https://etera.co.id/",
  },
  {
    title: "Bitres",
    description: "BITRES creates innovative solutions to complex challenges, fostering positive social and environmental impact.",
    image: "/assets/projects/bitres-webm.webm",
    href: "https://bitres.digii.co.id/",
  },
  {
    title: "Agent AI",
    description: "Agent AI boosts productivity and insights through smart data management and analysis.",
    image: "/assets/projects/agentai-webm.webm",
    href: "https://agentai.digii.co.id/",
  },
  {
    title: "AMS Certification",
    description: "Monitoring of PTPN Group Land Asset Certification",
    image: "/assets/projects/ams-webm.webm",
    href: "https://ams.digii.co.id/",
  },
  {
    title: "E-STDB National Monitoring Dashboard",
    description: "E-STDB National Monitoring Dashboard for Palm Oil Commodities.",
    image: "/assets/projects/dashnas-webm.webm",
    href: "https://dashnas.ditjenbun.digii.co.id/",
  },
  {
    title: "My Portofolio",
    description: "My Portfolio version 1.0.1.",
    image: "/assets/projects/porto1-webm.webm",
    href: "https://github.com/pishapis/my-porto",
  },
  {
    title: "My Portofolio 2",
    description: "My Portfolio version 1.0.2.",
    image: "/assets/projects/porto2-webm.webm",
    href: "https://pishapis.vercel.app/",
  },
  {
    title: "Etera Mobile",
    description: "ETERA is a digital ecosystem enhancing integration, accuracy, and efficiency to achieve National Sugar Self-Sufficiency.",
    image: "/assets/projects/mobile bg 1.webp",
    href: "#",
  },
  {
    title: "KPI Performance",
    description: "A KPI dashboard visualizes key metrics for quick analysis and data-driven performance improvement.",
    image: "/assets/projects/kpi-sgn1.webp",
    href: "https://kpi-sgn.digii.co.id/",
  },
  {
    title: "Health Screening",
    description: "Simkeswa enables easy monitoring, risk analysis, and data-driven decisions for better maternal care.",
    image: "/assets/projects/simkeswa3.webp",
    href: "https://skrining.digii.co.id/",
  },
  {
    title: "People Analytics",
    description: "Monitors employee data for HR needs, covering ratios, headcount, development costs, maturity, and compliance.",
    image: "/assets/projects/people-dahsboard.webp",
    href: "http://people-analytic.digii.co.id/",
  },
  {
    title: "Palm Oil Detection",
    description: "Palm tree detection using models that have been trained, namely satellite image models and aerial photos.",
    image: "/assets/projects/palm-result.webp",
    href: "https://palm-akara.digii.co.id/",
  },
  {
    title: "Gotara",
    description: "Application Farm Managament System : Maggot",
    image: "/assets/projects/gotara-login.webp",
    href: "#",
  },
  {
    title: "The B Andara City",
    description: "Housing buying and selling application and home building services",
    image: "/assets/projects/theb-home.webp",
    href: "#",
  },
  {
    title: "POS (Point Of Sale)",
    description: "Cashier application with full features, barcode scanning, stock management, etc.",
    image: "/assets/projects/bintang-produk.webp",
    href: "https://github.com/pishapis/POS-Laravel-10/tree/master",
  },
  {
    title: "MGBOX Warehouse System",
    description: "Application Wharehouse Managament System",
    image: "/assets/projects/mgbox-login.webp",
    href: "https://mgboxyogya.com/",
  },
];

const services = [
  {
    service: "Full-Stack Development",
    description:
      "Building modern web apps with React, Next.js, Laravel, and Node.js from end to end.",
    icon: Code2,
  },
  {
    service: "Mobile Development",
    description:
      "Creating cross-platform mobile apps with Flutter for smooth user experiences.",
    icon: MonitorSmartphone,
  },
  {
    service: "Responsive Design",
    description:
      "Crafting websites that look great and work flawlessly on any device.",
    icon: MonitorSmartphone,
  },
  {
    service: "WordPress Development",
    description:
      "Building custom WordPress sites with SEO optimization and tailored plugins.",
    icon: Frame,
  },
  {
    service: "Cloud & DevOps",
    description:
      "Deploying scalable solutions with AWS, Docker, and modern DevOps practices.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [replyForm, setReplyForm] = useState<ReplyFormData>({});
  const [message, setMessage] = useState<MessageState>({
    text: '',
    type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    const handleScroll = () => {
      const progress = carouselApi.scrollProgress();
      setScrollProgress(progress);

      setIsScrolling(true);
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      return () => clearTimeout(timeout);
    };

    const handleSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    };

    carouselApi.on("scroll", handleScroll);
    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("scroll", handleScroll);
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi])

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  const handleDownloadCV = () => {
    window.open('/assets/cv/Resume Muhammad Hafidz Ibnu Adi.pdf', '_blank');
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariantsSkill = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const fetchComments = async (page: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?page=${page}&limit=10`);

      // Type casting di sini!
      const data = await response.json() as FetchCommentsResponse;

      // Sekarang TypeScript tahu struktur data
      if (data.success && data.data) {
        const transformedComments: Comment[] = data.data.map((comment) => ({
          id: comment._id,
          name: comment.name,
          email: comment.email ?? '',
          message: comment.message,
          date: new Date(comment.createdAt).toLocaleDateString(),
          time: new Date(comment.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          parentId: comment.parentId,
          replies: comment.replies?.map((reply) => ({
            id: reply._id,
            name: reply.name,
            email: reply.email ?? '',
            message: reply.message,
            date: new Date(reply.createdAt).toLocaleDateString(),
            time: new Date(reply.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            parentId: reply.parentId
          })) ?? []
        }));

        if (page === 1) {
          setComments(transformedComments);
        } else {
          setComments(prev => [...prev, ...transformedComments]);
        }

        if (data.pagination) {
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
          setHasMore(data.pagination.hasMore);
        }
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      setMessage({ text: 'Failed to load comments', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleReplyChange = (commentId: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReplyForm({
      ...replyForm,
      [commentId]: {
        ...replyForm[commentId] ?? { name: '', email: '', message: '' },
        [e.target.name]: e.target.value
      }
    });
  };

  const handleCommentSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!commentForm.name.trim() || !commentForm.message.trim()) {
      setMessage({ text: 'Name and message are required', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: commentForm.name.trim(),
          email: commentForm.email.trim(),
          message: commentForm.message.trim(),
        }),
      });

      // Type casting!
      const data = await response.json() as PostCommentResponse;

      if (response.ok && data.success && data.data) {
        const newComment: Comment = {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email ?? '',
          message: data.data.message,
          date: new Date(data.data.createdAt).toLocaleDateString(),
          time: new Date(data.data.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          replies: []
        };

        setComments([newComment, ...comments]);
        setMessage({ text: 'Comment posted successfully!', type: 'success' });
        setCommentForm({ name: '', email: '', message: '' });

        setTimeout(() => {
          setMessage({ text: '', type: '' });
        }, 3000);
      } else {
        setMessage({ text: data.error ?? 'Failed to post comment', type: 'error' });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setMessage({ text: 'Failed to post comment. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (commentId: string): Promise<void> => {
    const reply = replyForm[commentId];
    if (!reply?.name.trim() || !reply?.message.trim()) {
      setMessage({ text: 'Name and message are required', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reply.name.trim(),
          email: reply.email?.trim(),
          message: reply.message.trim(),
          parentId: commentId
        }),
      });

      const data = await response.json() as PostCommentResponse;

      if (response.ok && data.success && data.data) {
        const newReply: Comment = {
          id: data.data._id,
          name: data.data.name,
          email: data.data.email ?? '',
          message: data.data.message,
          date: new Date(data.data.createdAt).toLocaleDateString(),
          time: new Date(data.data.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          parentId: data.data.parentId
        };

        setComments(comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies ?? []), newReply]
            };
          }
          return comment;
        }));

        setReplyForm({ ...replyForm, [commentId]: { name: '', email: '', message: '' } });
        setActiveReply(null);
        setExpandedComments(new Set([...expandedComments, commentId]));
        setMessage({ text: 'Reply posted successfully!', type: 'success' });

        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: data.error ?? 'Failed to post reply', type: 'error' });
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      setMessage({ text: 'Failed to post reply. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReply = (commentId: string) => {
    setActiveReply(activeReply === commentId ? null : commentId);
  };

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const loadMoreComments = () => {
    void fetchComments(currentPage + 1);
  };

  useEffect(() => {
    void fetchComments(1);
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>tailwindcss</span>
              <span className={styles.pill}>typescript</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Muhammad Hafidz.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Fullstack Developer passionate about digital art and web development,
                creating innovative and impactful digital products.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:hapisadi12@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-12 h-full w-full xl:mt-0 p-4 mb-12"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a <span className="text-primary font-semibold">fullstack developer</span> with{' '}
              <span className="text-primary font-semibold">5+ years experience</span> in IT field. Good communication skills,
              responsibility, flexible and good teamwork ability is an asset that I will bring into the work environment.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I like new things in work matters in the office or in the field, adaptable,
              always enthusiastic about what I do and this will make a positive contribution to growth your company.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4 text-primary">What I Bring:</h3>
              <ul className="space-y-3">
                {[
                  'Strong problem-solving skills',
                  'Clean and maintainable code',
                  'Collaborative team player',
                  'Continuous learning mindset',
                  'User-focused development',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className="group max-w-56 mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download Resume
            </motion.button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 xl:grid-cols-4 mt-10"
            >
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '13+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Happy Clients', value: '8+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <div className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </div>
                  <div className="tracking-tight text-muted-foreground xl:text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="skills" data-scroll-section
          className="py-20 md:py-32 relative overflow-hidden">
          {/* Background Elements */}
          <div className="container mx-auto px-4">
            {/* Section Title */}
            <div
              data-scroll
              data-scroll-speed="0.5"
            >

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                  ✨ Skills
                </span>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                  Technologies and tools
                </h2>
              </motion.div>

              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === category.value
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                      : 'bg-secondary text-foreground hover:bg-accent'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-6xl mx-auto"
              >
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariantsSkill}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="group relative border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary"
                  >
                    {/* Skill Icon */}
                    <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>

                    {/* Skill Name */}
                    <span className="text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel
                setApi={setCarouselApi}
                className="w-full cursor-grab active:cursor-grabbing"
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                  containScroll: "trimSnaps",
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {projects.map((project, index) => {
                    const isActive = index === current - 1;

                    return (
                      <CarouselItem
                        key={project.title}
                        className="pl-2 md:pl-4 md:basis-1/2 select-none"
                      >
                        <Card
                          id="tilt"
                          className={`transition-all duration-300 ${isScrolling ? 'scale-[0.98]' : 'scale-100'
                            } ${isActive ? 'opacity-100' : 'opacity-70'
                            } hover:scale-[1.02]`}
                        >
                          <CardHeader className="p-0 overflow-hidden">
                            <Link
                              href={project.href}
                              target="_blank"
                              passHref
                              onClick={(e) => {
                                // Cegah link terbuka saat sedang drag
                                if (isScrolling) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              {project.image.endsWith(".webm") ? (
                                <video
                                  src={project.image}
                                  autoPlay
                                  loop
                                  muted
                                  className={`aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 pointer-events-none ${isActive ? 'scale-100' : 'scale-105'
                                    }`}
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className={`aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 pointer-events-none ${isActive ? 'scale-100' : 'scale-105'
                                    }`}
                                  draggable={false}
                                />
                              )}
                            </Link>
                          </CardHeader>
                          <CardContent className={`absolute bottom-0 w-full bg-background/50 backdrop-blur transition-all duration-300 ${isActive ? 'translate-y-0' : 'translate-y-2'
                            }`}>
                            <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                              {project.description}
                            </CardTitle>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>

                <CarouselPrevious className="hover:scale-110 transition-transform active:scale-95" />
                <CarouselNext className="hover:scale-110 transition-transform active:scale-95" />
              </Carousel>

              <div className="mt-4 mb-2 w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-150 ease-out rounded-full"
                  style={{
                    width: `${scrollProgress * 100}%`,
                    transform: isScrolling ? 'scaleY(1.5)' : 'scaleY(1)'
                  }}
                />
              </div>

              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className={`font-semibold transition-all duration-200 ${isScrolling ? 'scale-110 text-primary' : 'scale-100'
                  } inline-block`}>
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I provide.
                  Don&apos;t hesitate to get in touch if you need more information.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="space-y-16"
          >
            {/* Contact Info */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24">
              <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
                Let&apos;s work{" "}
                <span className="text-gradient clash-grotesk">together.</span>
              </h2>
              <p className="mt-4 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl">
                I&apos;m currently available for freelance work and open to
                discussing new projects.
              </p>
              <Link href="mailto:hapisadi12@gmail.com" passHref>
                <Button className="mt-6" suppressHydrationWarning>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-medium tracking-tight xl:text-5xl">
                  <span className="text-gradient clash-grotesk">&lt;/Comments&gt;</span>
                </h2>
                <p className="mt-2 text-muted-foreground">Leave your thoughts and feedback</p>
              </motion.div>

              {/* Comment Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-lg bg-white/5 p-6 backdrop-blur xl:p-8"
              >
                {message.text && (
                  <div className={`mb-4 rounded-lg p-4 ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message.text}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={commentForm.name}
                      onChange={handleCommentChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={commentForm.email}
                      onChange={handleCommentChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={commentForm.message}
                      onChange={handleCommentChange}
                      required
                      rows={5}
                      placeholder="Leave a comment..."
                      className="w-full px-4 py-3 bg-background/50 backdrop-blur border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    onClick={handleCommentSubmit}
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        {'Submit Comment'}
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Comments List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </h3>

                {isLoading && comments.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 backdrop-blur rounded-lg border border-white/10">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading comments...</p>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 backdrop-blur rounded-lg border border-white/10">
                    <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-lg bg-white/5 p-6 backdrop-blur transition-all hover:bg-white/10 border border-white/10"
                      >
                        {/* Main Comment */}
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">{comment.name}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{comment.date} at {comment.time}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">{comment.message}</p>

                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => toggleReply(comment.id)}
                                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors font-medium"
                              >
                                <Reply className="w-4 h-4" />
                                Reply
                              </button>

                              {comment.replies && comment.replies.length > 0 && (
                                <button
                                  onClick={() => toggleReplies(comment.id)}
                                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                                >
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform ${expandedComments.has(comment.id) ? 'rotate-180' : ''
                                      }`}
                                  />
                                  {comment.replies.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}
                                </button>
                              )}
                            </div>

                            {/* Reply Form */}
                            {activeReply === comment.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 p-4 bg-background/30 rounded-lg border border-white/10 space-y-3"
                              >
                                <input
                                  type="text"
                                  name="name"
                                  value={replyForm[comment.id]?.name ?? ''}
                                  onChange={(e) => handleReplyChange(comment.id, e)}
                                  placeholder="Your name"
                                  className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground text-sm"
                                />
                                <input
                                  type="email"
                                  name="email"
                                  value={replyForm[comment.id]?.email ?? ''}
                                  onChange={(e) => handleReplyChange(comment.id, e)}
                                  placeholder="Email (optional)"
                                  className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground text-sm"
                                />
                                <textarea
                                  name="message"
                                  value={replyForm[comment.id]?.message ?? ''}
                                  onChange={(e) => handleReplyChange(comment.id, e)}
                                  rows={3}
                                  placeholder="Write a reply..."
                                  className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-foreground placeholder:text-muted-foreground text-sm"
                                />
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleReplySubmit(comment.id)}
                                    disabled={isSubmitting}
                                    size="sm"
                                  >
                                    Post Reply
                                  </Button>
                                  <Button
                                    onClick={() => setActiveReply(null)}
                                    variant="outline"
                                    size="sm"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </motion.div>
                            )}

                            {/* Replies List */}
                            {expandedComments.has(comment.id) && comment.replies && comment.replies.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }} 
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 space-y-3 pl-4 border-l-2 border-primary/30"
                              >
                                {comment.replies.map((reply) => (
                                  <motion.div
                                    key={reply.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-3 p-4 bg-background/20 rounded-lg border border-white/10"
                                  >
                                    <div className="flex-shrink-0">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/70 to-primary/30 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-semibold text-foreground text-sm">{reply.name}</h5>
                                        <span className="text-xs text-muted-foreground">
                                          {reply.date} at {reply.time}
                                        </span>
                                      </div>
                                      <p className="text-muted-foreground text-sm leading-relaxed">{reply.message}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Load More Button */}
                    {hasMore && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-4"
                      >
                        <Button
                          onClick={loadMoreComments}
                          disabled={isLoading}
                          variant="outline"
                          className="w-full"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                              Loading...
                            </span>
                          ) : (
                            <>
                              Load More Comments ({currentPage} / {totalPages})
                              <ChevronDown className="ml-2 w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
