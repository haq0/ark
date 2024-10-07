<template>
    <div>
        <aside :class="{ 'is-open': is_open, 'mobile': isMobile }">
            <div class="top-section">
                <div class="logo">
                    <img src="../assets/profile-picture.jpg" alt="haquire" class="profile-picture">
                </div>
                <button class="menu-toggle" @click="ToggleMenu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <template v-if="!isMobile || is_open">
                <h3>Menu</h3>
                <div class="menu">
                    <router-link class="button" to="/" @click="closeMenuOnMobile">
                        <i class="fas fa-home"></i>
                        <span class="text">Home</span>
                    </router-link>
                    <router-link class="button" to="/projects" @click="closeMenuOnMobile">
                        <i class="fas fa-project-diagram"></i>
                        <span class="text">Projects</span>
                    </router-link>
                    <router-link class="button" to="/about" @click="closeMenuOnMobile">
                        <i class="fas fa-user"></i>
                        <span class="text">About</span>
                    </router-link>
                    <router-link class="button" to="/contact" @click="closeMenuOnMobile">
                        <i class="fas fa-envelope"></i>
                        <span class="text">Contact</span>
                    </router-link>
                    <router-link class="button" to="/blog" @click="closeMenuOnMobile">
                        <i class="fas fa-blog"></i>
                        <span class="text">Blog</span>
                    </router-link>
                    <router-link class="button" to="/photography" @click="closeMenuOnMobile">
                        <i class="fas fa-camera"></i>
                        <span class="text">Photography</span>
                    </router-link>
                </div>
                <div class="flex"></div>
                <div class="menu bottom-section">
                    <router-link class="button" to="/settings" @click="closeMenuOnMobile">
                        <i class="fas fa-cog"></i>
                        <span class="text">Settings</span>
                    </router-link>
                </div>
            </template>
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const is_open = ref(localStorage.getItem('is_open') === 'true');
const isMobile = ref(false);
const wasClosedByUser = ref(false);

const ToggleMenu = () => {
    is_open.value = !is_open.value;
    localStorage.setItem('is_open', is_open.value);
    wasClosedByUser.value = !is_open.value;
}

const closeMenuOnMobile = () => {
    if (isMobile.value) {
        is_open.value = false;
        localStorage.setItem('is_open', 'false');
    }
}

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
}

const handleResize = () => {
    const wasMobile = isMobile.value;
    checkMobile();
    
    if (!isMobile.value && wasMobile) {
        // Transitioning from mobile to desktop
        if (!wasClosedByUser.value) {
            is_open.value = true;
            localStorage.setItem('is_open', 'true');
        }
    } else if (isMobile.value && !wasMobile) {
        // Transitioning from desktop to mobile
        is_open.value = false;
        localStorage.setItem('is_open', 'false');
    }
}

onMounted(() => {
    checkMobile();
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;
    background-color: var(--sidebar-bg);
    color: var(--sidebar-color);
    transition: 0.2s ease-out;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;

    &.mobile {
        position: fixed;
        z-index: 99;
        width: auto;
        height: auto;
        left: 1rem;
        top: 1rem;
        padding: 0;
        background-color: transparent;

        .top-section {
            flex-direction: row;
            align-items: center;
        }

        .logo {
            margin-bottom: 0;
            margin-right: 1rem;
        }

        .menu-toggle {
            background-color: var(--sidebar-bg);
            padding: 0.5rem;
            border-radius: 50%;
        }

        &.is-open {
            width: 100%;
            height: 100vh;
            left: 0;
            top: 0;
            padding: 1rem;
            background-color: var(--sidebar-bg);

            .top-section {
                justify-content: space-between;
                padding-right: 1rem;
            }

            .logo {
                margin-right: 0;
            }
        }
    }

    .top-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .logo {
        margin-bottom: 1rem;
        .profile-picture {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .menu-toggle {
        font-size: 1.5rem;
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;

        &:hover {
            color: var(--primary);
        }
    }

    h3, .button .text {
        opacity: 0;
        transition: 0.3s ease-out;
    }

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .fas, .fab {
                font-size: 1.5rem;
                color: var(--sidebar-color);
                transition: 0.2s ease-out;
                width: 2rem;
                text-align: center;
            }

            .text {
                color: var(--sidebar-color);
                transition: 0.2s ease-out;
                margin-left: 0.5rem;
                display: none;
                font-size: 1rem;
            }

            &:hover, &.router-link-exact-active {
                background-color: rgba(255, 255, 255, 0.1);

                .fas, .fab, .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {
                border-right: 5px solid var(--primary);
            }
        }
    }

    .flex {
        flex-grow: 1;
    }

    .bottom-section {
        margin-top: auto;
    }

    &.is-open {
        width: var(--sidebar-width);

        .top-section {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 1rem;
        }

        .menu-toggle {
            transform: rotate(-180deg);
        }

        h3, .button .text {
            opacity: 1;
        }

        .menu .button {
            justify-content: flex-start;

            .fas, .fab {
                margin-right: 1rem;
            }

            .text {
                display: inline;
            }
        }
    }

    // Media query for desktop
    @media (min-width: 769px) {
        .logo {
            .profile-picture {
                width: 2.4rem;
                height: 2.4rem;
            }
        }

        .menu-toggle {
            font-size: 1.8rem;
        }

        h3 {
            font-size: 1.05rem;
        }

        .menu {
            .button {
                .fas, .fab {
                    font-size: 1.8rem;
                    width: 2.4rem;
                }

                .text {
                    font-size: 1.2rem;
                }
            }
        }

        &.is-open {
            width: calc(var(--sidebar-width) * 1.2);
        }
    }
}
</style>